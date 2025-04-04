<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{ BelongsTo };

class Credit extends Model
{
    protected $fillable = [
        'account_id',
        'sms_asked',
        'sms_delivered'
    ];

    protected function casts(): array
    {
        return [
            'account_id' => 'integer',
            'sms_asked' => 'integer',
            'sms_delivered' => 'integer'
        ];
    }

    public function Account(): BelongsTo {
        return $this->belongsTo(Account::class);
    }
}
