# frozen_string_literal: true

# An "API consumer" that iterates through the API objects by simply globbing.
class OdcaClientLibrary
  def initialize(build_path)
    @build_path = build_path
  end

  def each_ballot(&block)
    return to_enum(:each_ballot) unless block_given?

    Dir[File.join(@build_path, 'ballot', '*', 'index.json')]
      .each(&block)

    self
  end

  def each_locality(&block)
    return to_enum(:each_locality) unless block_given?

    Dir[File.join(@build_path, 'locality', '*', 'index.json')]
      .delete_if { |filename| filename.include?('search') }
      .each(&block)

    self
  end

  def each_candidate(&block)
    return to_enum(:each_candidate) unless block_given?

    Dir[File.join(@build_path, 'candidate', '*', 'index.json')]
      .each(&block)

    self
  end

  def each_referendum(&block)
    return to_enum(:each_referendum) unless block_given?

    Dir[File.join(@build_path, 'referendum', '*', 'index.json')]
      .each(&block)

    self
  end

  def each_current_ballot(&block)
    return to_enum(:each_current_ballot) unless block_given?

    Dir[File.join(@build_path, 'locality', '*', 'current_ballot', 'index.json')]
      .each(&block)

    self
  end
end

module OdcaJsonPage
  # OdcaJsonPage objects are similar to Jekyll pages except that they load their
  # data from the API objects. Since there are a couple places where our API
  # objects don't match the format of Jekyll pages, this requires a bit of weird
  # logic:
  #
  # * For normal Jekyll pages, the output filename matches the input filename.
  #   Since our API structure is unconventional, we don't want this, so we'll
  #   override the output filename on a type-specific basis.
  # * All Jekyll pages need a "title" data field, but some API objects don't
  #   have one.
  class Base < Jekyll::Page
    # Class methods:
    class << self
      def from_json(site, json_path)
        data = JSON.parse(File.read(json_path))

        case type
        when 'candidate'
          output_filename = data['name'].downcase.gsub(/[^\w]+/, '-') + '.html'
          data['title'] = data['name']
        when 'locality'
          data = data.first
          output_filename = data['name'].downcase.gsub(/[^\w]+/, '-') + '.html'
          data['title'] = data['name']
        when 'referendum'
          output_filename = data['title'].downcase.gsub(/[^\w]+/, '-') + '.html'
        when 'ballot'
          output_filename = "#{data['date']}-locality-#{data['locality_id']}.html"
          data['title'] = "#{data['date']} (locality #{data['locality_id']})"
        end

        unless output_filename
          raise "Could not auto-determine filename for #{json_path} (type: #{type})"
        end

        new(site, site.source, type, output_filename, data)
      end

      # For subclasses (Locality, Candidate, Referendum, etc.) use the class name
      # to determine the type. This applies default attributes as defined in
      # _config.yml. (The most important of these attributes is layout.)
      def type
        name.split('::').last.downcase
      end
    end

    # @param site [Jekyll::Site]
    # @param base [String] Path to the Jekyll root (`site.source`)
    # @param output_dir [String] Path to the output file relative the base
    #   directory given by `site.source`
    # @param output_filename [String] Filename of the output file
    # @param json_path [String] Path to the JSON file. The JSON file will be
    #   accessible as the data in the rendered template.
    def initialize(site, base, output_dir, output_filename, data)
      @data = data
      super(site, base, output_dir, output_filename)
    end

    # Since the data is passed in to the constructor, we can re-use everything
    # in the superclass's constructor except the call to this method.
    def read_yaml(*); end

    # Override this Jekyll method
    def type
      self.class.type
    end
  end

  class Locality < Base; end
  class Candidate < Base; end
  class Referendum < Base; end
  class Ballot < Base; end
end

# Use the API to generate pages that Jekyll can render.
class OdcaGenerator < Jekyll::Generator
  def generate(site)
    build_path = File.expand_path(site.config['odca_build_path'])

    raise 'Must set `odca_build_path` config path!' unless build_path
    raise 'Config value `odca_build_path` looks wrong' unless File.directory?(build_path)

    client = OdcaClientLibrary.new(build_path)

    # Register all the pages!
    client
      .each_ballot     { |b| site.pages << OdcaJsonPage::Ballot.from_json(site, b) }
      .each_candidate  { |c| site.pages << OdcaJsonPage::Candidate.from_json(site, c) }
      .each_referendum { |r| site.pages << OdcaJsonPage::Referendum.from_json(site, r) }
      .each_locality   { |l| site.pages << OdcaJsonPage::Locality.from_json(site, l) }

    # Add an 'is_current_ballot' field for the current ballot for ease of view
    # logic.
    client.each_current_ballot do |b|
      current = OdcaJsonPage::Ballot.from_json(site, b)
      ballot_page = site.pages.detect { |p| p.type == 'ballot' && p['id'] == current['id'] }
      ballot_page.data['is_current_ballot'] = true
    end
  end
end

Jekyll::Hooks.register :site, :pre_render do |site, payload|
  # Add pages to the render context so they can be accessed in views e.g.:
  #   {% for candidate in site.candidates %}
  payload.site['candidates'] = site.pages.find_all { |p| p.type == 'candidate' }
  payload.site['ballots'] = site.pages.find_all { |p| p.type == 'ballot' }
  payload.site['localities'] = site.pages.find_all { |p| p.type == 'locality' }
  payload.site['referendums'] = site.pages.find_all { |p| p.type == 'referendum' }
end
