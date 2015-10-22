# require 'rspec'
require 'capybara/rspec'

Capybara.register_driver :selenium do |app|
  Capybara::Selenium::Driver.new(app, :browser => :chrome)
end

Capybara.default_driver = :selenium

describe 'MPC', :type => :feature do
  before { visit 'http://localhost:8080' }
  let (:keys) { ['j','k','l','f','g','h','a','s','d'] }

  context 'when keys are pressed' do
    it 'should light up corresponding letters' do

      keys.each do |key|
        letter = find("table td##{key}")
        expect{
          find('body').native.send_keys(key)
        }.to change{letter['class']}
      end
    end

    it 'should light up corresponding pads' do
      keys.each_with_index do |key, i|
        pads = all('table td.drum-pad')
        expect{
          find('body').native.send_keys(key)
        }.to change{pads[i]['class']}
      end
    end
  end
end