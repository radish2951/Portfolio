class ImagesController < ApplicationController

  def thumbnailize
    @image = Image.find(params[:id])
    type = @image.type.nil? ? "Thumbnail" : nil
    @image.update_attribute(:type, type)
    redirect_to edit_post_path(@image.post)
  end

  def destroy
    @image = Image.find(params[:id])
    @image.destroy
    redirect_to edit_post_path(@image.post)
  end

  def create
    @image = Image.new(image_params)
    unless @image.save
      flash[:danger] = "正しいファイル名を入力してください"
    end
    redirect_to edit_post_path(@image.post)
  end

  private

  def image_params
    params.require(:image).permit(:name, :post_id)
  end

end
