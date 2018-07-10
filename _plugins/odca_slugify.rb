module Jekyll
  module ODCASlugify
    def odca_slugify(text)
      (text || '').downcase.gsub(/[\._~!$&'()+,;=@]+/, '').gsub(/[^a-z0-9-]+/, '-')
    end
  end
end

Liquid::Template.register_filter(Jekyll::ODCASlugify)
