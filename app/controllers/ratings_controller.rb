class RatingsController < ApplicationController
  def index
    @ratings = Rating.all
    @users    = User.all
    render json: { ratings: @ratings, users: @users}

  end

  def show
    @rating = Rating.find params[:id]
    render :json => @rating
  end

  def new
    @rating = Rating.new
  end

  def update
    @rating = Rating.find params[:id]
    @rating.update(rating_params)
    if @rating.save
      render :json => @rating
    else
      puts 'error saving!'
    end
  end

  def create
    @rating = Rating.new(rating_params)

    if @rating.save
      render :json => @rating
      
    end
  end

  private

  def rating_params
    params.require(:rating).permit(
      :recipe_id,
      :user_id,
      :value,      
    )
  end
end
