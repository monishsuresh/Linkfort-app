from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from rest_framework import generics, permissions
from rest_framework.response import Response
from .serializers import ChangePasswordSerializer
from .serializers import RegisterSerializer
from rest_framework.exceptions import ValidationError
from rest_framework import viewsets
from .models import Post, Profile, Message, TrustBadge
from .serializers import PostSerializer, ProfileSerializer, MessageSerializer, TrustBadgeSerializer

def home(request):
    return HttpResponse("Hello, StudyBud!")

def room(request):
    return HttpResponse("This is a room page.")



class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer
class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all().order_by('-timestamp')
    serializer_class = MessageSerializer

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user.profile)


class TrustBadgeViewSet(viewsets.ModelViewSet):
    queryset = TrustBadge.objects.all()
    serializer_class = TrustBadgeSerializer

    def perform_create(self, serializer):
        giver = self.request.user.profile
        receiver = serializer.validated_data['receiver']

        
        if TrustBadge.objects.filter(giver=giver, receiver=receiver).exists():
            raise ValidationError("already done.")

        serializer.save(giver=giver)


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
