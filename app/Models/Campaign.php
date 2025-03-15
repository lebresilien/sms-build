<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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

    public function sender(): belongsTo {
        return $this->belongsTo(Sender::class);
    }
}
