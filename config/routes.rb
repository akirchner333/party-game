Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "games#new"
  resources :games, only: [:show, :create]
  resources :players, only: [:show, :create]
end
