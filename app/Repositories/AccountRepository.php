<?php

namespace App\Repositories;

use App\Models\Account;
use App\Repositories\BaseRepository;

class AccountRepository extends BaseRepository
{
    protected $fieldSearchable = [
        'user_id',
        'sms',
    ];

    public function getFieldsSearchable(): array
    {
        return $this->fieldSearchable;
    }

    public function model(): string
    {
        return Account::class;
    }

}
