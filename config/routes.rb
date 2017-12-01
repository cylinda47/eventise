Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do
    resources :events, only: [:index, :show, :create, :update, :destroy]
    resources :tickets, only: [:create]
    resources :categories, only: [:update]
    resource :user, only: [:create, :show, :update]
    resource :session, only: [:create, :destroy]
    resources :categories, only: [:show, :update]
    resources :bookmarks, only: [:create, :destroy]
    resources :orders, only: [:create, :show]
  end
  root "static_pages#root"
end
