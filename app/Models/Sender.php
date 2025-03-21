<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\belongsTo;

class Sender extends Model
{
    protected $fillable = [
        'account_id',
        'name',
        'slug'
    ];

    protected function casts(): array
    {
        return [
            'account_id' => 'integer',
            'name' => 'string',
            'slug' => 'string'
        ];
    }

    public function account(): belongsTo {
        return $this->belongsTo(Account::class);
    }

    public function campaigns(): HasMany {
        return $this->hasMany(Sender::class);
    }

    public function transactions(): HasMany {
        return $this->hasMany(Transaction::class);
    }
}
