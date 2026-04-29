# Ruby on Rails Example
# Muy bueno para consumir APIs REST y crear dashboards de movilidad.

class MobilityController < ApplicationController
  def index
    @stations = Station.all
    render json: @stations
  end
end
