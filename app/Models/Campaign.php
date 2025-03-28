<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{ BelongsTo, HasMany };

class Campaign extends Model
{
    protected $fillable = [
        'sender_id',
        'title',
        'message',
        'sendAt'
    ];

    protected function casts(): array
    {
        return [
            'sender_id' => 'integer',
            'title' => 'string',
            'message' => 'string'
        ];
    }

    public function sender(): BelongsTo {
        return $this->belongsTo(Sender::class);
    }

    public function transactions(): HasMany {
        return $this->hasMany(Transaction::class);
    }
}
