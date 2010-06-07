# Generated by jeweler
# DO NOT EDIT THIS FILE DIRECTLY
# Instead, edit Jeweler::Tasks in Rakefile, and run the gemspec command
# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = %q{midas}
  s.version = "0.0.2"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.authors = ["Jeremy Jackson"]
  s.date = %q{2010-06-06}
  s.description = %q{Provides a front end for editing content in a contextual way with WYSIWYG editing}
  s.email = %q{jejacks0n@gmail.com}
  s.extra_rdoc_files = [
    "LICENSE",
     "README.textile"
  ]
  s.files = [
    ".bundle/config",
     ".document",
     ".gitignore",
     "Gemfile",
     "LICENSE",
     "README.textile",
     "Rakefile",
     "VERSION",
     "features/step_definitions/editor_steps.rb",
     "features/step_definitions/web_steps.rb",
     "features/support/env.rb",
     "features/support/paths.rb",
     "features/view_editor.feature",
     "generators/midas/midas_generator.rb",
     "lib/midas.rb",
     "midas.gemspec",
     "public/images/midas/toolbars/actions/_background.png",
     "public/images/midas/toolbars/actions/_background_radio.png",
     "public/images/midas/toolbars/actions/_separator.png",
     "public/images/midas/toolbars/actions/extra/prefspane.png",
     "public/images/midas/toolbars/actions/extra/todospane.png",
     "public/images/midas/toolbars/actions/historypanel.png",
     "public/images/midas/toolbars/actions/insertcharacter.png",
     "public/images/midas/toolbars/actions/insertlink.png",
     "public/images/midas/toolbars/actions/insertmedia.png",
     "public/images/midas/toolbars/actions/insertobject.png",
     "public/images/midas/toolbars/actions/inserttable.png",
     "public/images/midas/toolbars/actions/inspectorpanel.png",
     "public/images/midas/toolbars/actions/notespanel.png",
     "public/images/midas/toolbars/actions/preview.png",
     "public/images/midas/toolbars/actions/redo.png",
     "public/images/midas/toolbars/actions/save.png",
     "public/images/midas/toolbars/actions/undo.png",
     "public/images/midas/toolbars/htmleditor/_background.png",
     "public/images/midas/toolbars/htmleditor/_line_separator.png",
     "public/images/midas/toolbars/htmleditor/_separator.png",
     "public/images/midas/toolbars/htmleditor/buttons.png",
     "public/javascripts/midas/config.js",
     "public/javascripts/midas/dialog.js",
     "public/javascripts/midas/midas.js",
     "public/javascripts/midas/native_extensions.js",
     "public/javascripts/midas/palette.js",
     "public/javascripts/midas/region.js",
     "public/javascripts/midas/statusbar.js",
     "public/javascripts/midas/toolbar.js",
     "public/javascripts/prototype.js",
     "public/midas/backcolor.html",
     "public/midas/examples/bundled.html",
     "public/midas/examples/iframe.html",
     "public/midas/examples/index.html",
     "public/midas/examples/javascript_archive.js",
     "public/midas/forecolor.html",
     "public/stylesheets/midas/dialog.css",
     "public/stylesheets/midas/midas.css",
     "public/stylesheets/midas/palette.css",
     "public/stylesheets/midas/region.css",
     "public/stylesheets/midas/statusbar.css",
     "public/stylesheets/midas/toolbar.css",
     "rails/init.rb",
     "spec/javascripts/dialog_spec.js",
     "spec/javascripts/fixtures/midas_fixture.html",
     "spec/javascripts/fixtures/midas_styles.css",
     "spec/javascripts/fixtures/native_extensions_fixture.html",
     "spec/javascripts/helpers/browser_detection.js",
     "spec/javascripts/helpers/event_simulation.js",
     "spec/javascripts/helpers/spec_helper.js",
     "spec/javascripts/midas_spec.js",
     "spec/javascripts/native_extensions_spec.js",
     "spec/javascripts/palette_spec.js",
     "spec/javascripts/region_spec.js",
     "spec/javascripts/statusbar_spec.js",
     "spec/javascripts/support/jasmine.yml",
     "spec/javascripts/support/jasmine_config.rb",
     "spec/javascripts/support/jasmine_runner.rb",
     "spec/javascripts/toolbar_spec.js",
     "spec/ruby/helpers/spec_helper.rb",
     "spec/ruby/midas_spec.rb",
     "spec/spec.opts",
     "tasks/midas_tasks.rake"
  ]
  s.homepage = %q{http://github.com/jejacks0n/midas}
  s.rdoc_options = ["--charset=UTF-8"]
  s.require_paths = ["lib"]
  s.rubygems_version = %q{1.3.5}
  s.summary = %q{A rich text editor gem for Rails}
  s.test_files = [
    "spec/javascripts/support/jasmine_config.rb",
     "spec/javascripts/support/jasmine_runner.rb",
     "spec/ruby/helpers/spec_helper.rb",
     "spec/ruby/midas_spec.rb"
  ]

  if s.respond_to? :specification_version then
    current_version = Gem::Specification::CURRENT_SPECIFICATION_VERSION
    s.specification_version = 3

    if Gem::Version.new(Gem::RubyGemsVersion) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<packr>, [">= 3.1.0"])
      s.add_development_dependency(%q<rspec>, [">= 1.3.0"])
      s.add_development_dependency(%q<jasmine>, [">= 0.10.3.5"])
    else
      s.add_dependency(%q<packr>, [">= 3.1.0"])
      s.add_dependency(%q<rspec>, [">= 1.3.0"])
      s.add_dependency(%q<jasmine>, [">= 0.10.3.5"])
    end
  else
    s.add_dependency(%q<packr>, [">= 3.1.0"])
    s.add_dependency(%q<rspec>, [">= 1.3.0"])
    s.add_dependency(%q<jasmine>, [">= 0.10.3.5"])
  end
end

