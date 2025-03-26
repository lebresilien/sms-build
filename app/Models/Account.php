<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{ BelongsTo, HasMany };

class Account extends Model
{
    protected $fillable = [
        'user_id',
        'sms'
    ];

    protected function casts(): array
    {
        return [
            'user_id' => 'integer',
            'sms' => 'integer',
        ];
    }

    public function senders(): HasMany {
        return $this->hasMany(Sender::class);
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
