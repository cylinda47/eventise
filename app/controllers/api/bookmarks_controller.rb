class Api::BookmarksController < ApplicationController
    def create
        @bookmark = Bookmark.new(bookmark_params)
        if @bookmark.save
            @user = current_user
            render "api/users/show"
        else
            render json: @bookmark.errors.full_messages, status: 422
        end
    end
    
    def destroy
         @bookmark = current_user.bookmarks.find_by(event_id: params[:id])
         @user = current_user
         if @bookmark.destroy
            render "api/users/show"
        else
            render json: @bookmark.errors.full_messages, status: 422
        end
    end

    private

    def bookmark_params
        params.require(:bookmark).permit(:user_id, :event_id)
    end
end
