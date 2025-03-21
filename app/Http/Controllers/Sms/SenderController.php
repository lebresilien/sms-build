<?php

namespace App\Http\Controllers\Sms;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Repositories\SenderRepository;

class SenderController extends Controller
{
    /** @var SenderRepository */
    private $senderRepository;

    public function __construct(SenderRepository $senderRepository)
    {
        $this->senderRepository = $senderRepository;
    }

    /**
     * Show the user's password settings page.
     */
    public function index(Request $request): Response
    {
        /*  return $request->user()->account->id;
        $data = $this->senderRepository->all(['account_id' => $request->user()->account->id]); */
$data = [];
        return Inertia::render('senders/page', [
            'data' => $data
        ]);
    }

}
