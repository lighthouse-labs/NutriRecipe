class CommentsController < ApplicationController
  def index
    @comments = Comment.all
    @users    = User.all
    render json: { comments: @comments, users: @users}

  end

  def show
    @comment = Comment.find params[:id]
    render :json => @comment
  end

  def new
    @comment = Comment.new
  end

  def create
    @comment = Comment.new(comment_params)

    if @comment.save
      render :json => @comment
    else
      notice 'error saving!'
    end
  end

  private

  def comment_params
    params.require(:comment).permit(
      :user_id,
      :recipe_id,
      :value,      
    )
  end
end


