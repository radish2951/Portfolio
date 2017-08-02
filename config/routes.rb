Rails.application.routes.draw do
  get 'static_pages/home'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  root 'static_pages#home'

  resources :users
  resources :categories
  resources :posts
  resources :images

  patch '/posts/:id/flip', to: 'posts#flip', as: :flip_post

  patch '/images/:id/thumbnailize', to: 'images#thumbnailize', as: :thumbnailize_image

  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get '/:slug', to: 'posts#assort'

end
