class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy, :flip]
  before_action :logged_in_user, only: [:edit, :update, :index, :new, :create, :destroy]

  def assort
    slug = params[:slug]

    # if @slug matches to category name
    if !(category = Category.find_by(name: slug.singularize.capitalize)).nil?
      if logged_in?
        @posts = Post.where(category_id: category).order(created_at: :desc)
      else
        @posts = Post.where(category_id: category, published: true).order(created_at: :desc)
      end
      render 'index'
    elsif !(@post = Post.find_by(title: slug)).nil?
      render 'show'
    else
      render plain: "そんなものはない"
    end
  end

  def flip
    current_state = @post.published
    @post.update_attribute(:published, !current_state)
    redirect_to category_name_path(@post.category)
  end

  def index
    if logged_in?
      @posts = Post.all.order(created_at: :desc)
    else
      @posts = Post.where(published: true).order(created_at: :desc)
    end
  end

  def show
  end

  def new
    @post = Post.new
  end

  def edit
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      flash[:success] = "新たに投稿が追加されました！"
      redirect_to category_name_path(@post.category)
    else
      flash[:danger] = "入力した内容に不備があります"
      redirect_to new_post_path
    end
  end

  def update
    if @post.update_attributes(post_params)
      flash[:success] = "データが更新されました！"
      redirect_to post_title_path(@post)
    else
      flash[:danger] = "入力した内容に不備があります"
      redirect_to edit_post_path(@post)
    end
  end

  def destroy
    @post.destroy
    redirect_to category_name_path(@post.category)
  end

  private

  def post_params
    params.require(:post).permit(:title, :description, :published, :category_id)
  end

  def set_post
    @post = Post.find(params[:id])
  end

  def logged_in_user
    unless logged_in?
      store_location
      redirect_to root_url
    end
  end

end
