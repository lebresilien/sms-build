<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CreditNotification extends Notification
{
    use Queueable;
    private $data;

    /**
     * Create a new notification instance.
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        if ($this->data['type'] === 'request') return (new MailMessage)
            ->subject('Nouvelle Recharge')
            ->line('Une nouvelle demande a été effectuée par ' . $this->data['user_name'])
            ->line('Pour une recharge de ' . $this->data['sms'] . ' SMS')
            ->line('Pour le compte ' . $this->data['account'])
            ->action('Valider', url('/'))
            ->line('Thank you for using our application!');

        else return  (new MailMessage)
            ->subject('Confirmation Recharge')
            ->line('Votre demande de recharge de ' . $this->data['sms'] . ' SMS a été effectuée')
            ->line('Veuillez consulter votre compte')
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
