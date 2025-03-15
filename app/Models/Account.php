<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\{belongsTo, HasMany};

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

    public function user(): belongsTo {
        return $this->belongsTo(User::class);
    }
}
