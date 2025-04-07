<?php

namespace App\Filament\Resources\CreditResource\Pages;

use App\Filament\Resources\CreditResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Notification;
use App\Notifications\CreditNotification;

class EditCredit extends EditRecord
{
    protected static string $resource = CreditResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }

    protected function afterSave(): void
    {
        if($this->record->sms_delivered > 0) {

            $data = [
                'sms_asked' => $this->record->sms_asked,
                'sms' => $this->record->sms_delivered,
                'type' => 'response'
            ];

            $this->record->account->increment('sms', $this->record->sms_delivered);

            Notification::route('mail', $this->record->account->user->email)->notify(new CreditNotification($data));
        }
    }
}
