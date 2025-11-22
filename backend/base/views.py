from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import ChangePasswordSerializer
from .serializers import RegisterSerializer
from rest_framework.exceptions import ValidationError
from rest_framework import viewsets
from .models import Post, Profile, Message, Rating, Exchange
from .serializers import PostSerializer, ProfileSerializer, MessageSerializer, RatingSerializer, ExchangeSerializer
from django.db.models import Q


class PostViewSet(viewsets.ModelViewSet):
    # queryset defines the default set of posts returned
    queryset = Post.objects.all().order_by("-created_at")
    # serializer_class specifies which serializer to use
    serializer_class = PostSerializer
    # permission_classes restrict access (authenticated users can create, anyone can read)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    # filter_backends allow filtering and searching
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    # filterset_fields define which fields can be filtered via query params
    filterset_fields = ["post_type", "market_type", "status", "location_area"]
    # search_fields allow text search
    search_fields = ["title", "description"]
    # ordering_fields allow sorting
    ordering_fields = ["created_at", "price", "exchange_count"]

    # perform_create ensures created_by is set to the current user's profile
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user.profile)

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.select_related("user").all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.AllowAny]



class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all().order_by('-timestamp')
    serializer_class = MessageSerializer

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user.profile)


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all().order_by("-created_at")
    serializer_class = RatingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # rater is always the logged-in user
        serializer.save(rater=self.request.user.profile)



class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, queryset=None):
        return self.request.user

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            if not user.check_password(serializer.data.get("old_password")):
                return Response({"old_password": "Wrong password"}, status=400)

            user.set_password(serializer.data.get("new_password"))
            user.save()
            return Response({"status": "password changed"}, status=200)

        return Response(serializer.errors, status=400)
class ExchangeViewSet(viewsets.ModelViewSet):
    queryset = Exchange.objects.all()
    serializer_class = ExchangeSerializer

    def get_queryset(self):
        user = self.request.user.profile
        return Exchange.objects.filter(Q(initiator=user) | Q(receiver=user))