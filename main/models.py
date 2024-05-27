from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.db.models import Avg


class User(AbstractUser):
    avatar = models.ImageField(blank=True, verbose_name='Аватарка')
    phone = models.CharField(blank=True, max_length=30,)

    def __str__(self):
        return self.username

    def exist(self):
        return len(User.objects.filter(username=self.username)) > 0

    def get_avatar_url(self):
        if not self.avatar:
            return 'https://abrakadabra.fun/uploads/posts/2021-12/1640528661_1-abrakadabra-fun-p-serii-chelovek-na-avu-1.png'

        return self.avatar.url


class Course(models.Model):
    STATUS_CHOICES = [
        ('pending', 'На рассмотрении'),
        ('accepted', 'Принято'),
        ('rejected', 'Отклонено'),
    ]

    title = models.CharField(max_length=150, verbose_name='Название')
    description = models.TextField(blank=True, verbose_name='Описание')
    author = models.CharField(max_length=150, blank=True, verbose_name='Автор')
    avatar = models.ImageField(blank=True, verbose_name='Аватарка')
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='pending',
        verbose_name='Статус'
    )

    users = models.ManyToManyField(User)

    def __str__(self):
        return f'{self.title} ({self.author})'

    def get_short_description(self):
        max_len = 80

        if len(str(self.description)) <= max_len:
            return self.description

        return self.description[:max_len - 3] + '...'

    def get_lessons_count(self):
        return len(self.users.all())

    def get_average_rating(self):
        average_rating = self.comments.aggregate(Avg('rating'))['rating__avg']
        if average_rating:
            return round(average_rating, 1)

        return 0

    def get_comment_count(self):
        return self.comments.count()


class Comment(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Автор', related_name='comments')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, verbose_name='Курс', related_name='comments')
    text = models.TextField(verbose_name='Текст комментария')
    rating = models.IntegerField(
        verbose_name='Рейтинг',
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )

    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Дата обновления')

    def __str__(self):
        return f'Комментарий {self.text} от {self.author.username} к курсу {self.course.title}'
