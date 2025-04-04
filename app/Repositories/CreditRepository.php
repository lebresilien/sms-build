<?php

namespace App\Repositories;

use App\Models\Credit;
use App\Repositories\BaseRepository;

class CreditRepository extends BaseRepository
{
    protected $fieldSearchable = [
        'account_id',
        'sms_asked',
    ];

    public function getFieldsSearchable(): array
    {
        return $this->fieldSearchable;
    }

    public function model(): string
    {
        return Credit::class;
    }

}
