<?php

namespace App\Http\Controllers\Sms;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use App\Repositories\SenderRepository;
use App\Http\Requests\Senders\SenderRequest;

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
        $data = $this->senderRepository->all(['account_id' => $request->user()->account->id]);

        return Inertia::render('senders/page', [
            'senders' => $data
        ]);
    }

    public function store(SenderRequest $request): RedirectResponse {

        $data = $this->senderRepository->create([
            'account_id' => $request->user()->account->id,
            'name' => $request->name,
            'slug' => strtoupper(Str::slug($request->name))
        ]);

        return to_route('senders.index');
    }

    public function delete($id): RedirectResponse {

        $item = $this->senderRepository->find($id);

        $this->senderRepository->delete($id);

        return to_route('senders.index');
    }

}
