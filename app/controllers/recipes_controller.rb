class RecipesController < ApplicationController
  def index
    @recipes = Recipe.all
    render :json => @recipes
  end

  def show
    @recipe = Recipe.find params[:id]
    render :json => @recipe
  end

  def new
    @recipe = Recipe.new
  end

  def destroy
    @recipe = Recipe.find params[:id]
    @recipe.destroy
    @recipes = Recipe.all
    render :json => @recipes
  end

  def update
    @recipe = Recipe.find params[:id]
    @recipe.update(recipe_params)
    if @recipe.save
      render :json => @recipe
    else
      puts 'error saving!'
    end
  end


  def create
    @recipe = Recipe.new(recipe_params)

    if @recipe.save
      render :json => @recipe
    else
      puts 'error saving!'
    end
  end

  private

  def recipe_params
    params.require(:recipe).permit(
      :user_id,
      :category_id,
      :name,
      :description,
      :ingredients,
      :steps,
      :serving_size,
      :estimated_time,
      :average_rating,
      :image_url
    )
  end
end
