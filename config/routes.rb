Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  get '/users', to: 'users#index'
  
  resource :users, only: [:create]
  resources :recipes
  resources :categories
  resources :comments

  post "/login", to: "auth#login"
  get "/auto_login", to: "auth#auto_login"
  get "/user_is_authed", to: "auth#user_is_authed"


  # get '/recipes', to: 'recipes#index'
  #get '/recipes/categories', to: 'recipes#new'
  #post '/recipe', to:'recipes#create'
  get '/recipes/nutrifacts', to:'recipes#nutri_facts'
  # get '/recipes', to: 'recipes#index'
  # get '/recipes/categories', to: 'recipes#new'
  # post '/recipe', to:'recipes#create'
  # get '/recipes/new', to: 'recipes#new'
  # get '/recipes/show', to: 'recipes#show'
end
