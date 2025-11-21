from django.urls import path
from . import views
from django.urls import path, include
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from .views import PostViewSet, ProfileViewSet, MessageViewSet, TrustBadgeViewSet, RegisterView, ChangePasswordView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("", views.home, name="home"),
    path("room/", views.room, name="room"),
]

# Router generates RESTful endpoints for your ViewSets:

router = routers.DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'profiles', ProfileViewSet)
router.register(r'messages', MessageViewSet)
router.register(r'trustbadges', TrustBadgeViewSet)


urlpatterns = [
    path('', include(router.urls)),     # CRUD endpoints from ViewSets
    path("register/", RegisterView.as_view(), name="register"),         
    path("change-password/", ChangePasswordView.as_view(), name="change-password"),         
    path('login/', obtain_auth_token, name='api_login'),  # DRF token login 
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),   
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # JWT (SimpleJWT)  endpoints


    
    
]