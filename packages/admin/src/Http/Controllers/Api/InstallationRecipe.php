<?php

namespace Admin\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Http;

class InstallationRecipe
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $request->validate([
            'token' => 'required',
        ]);



            return ['success' => true];


        // return ['success' => false, 'error' => 'We could not verify the token!'];
    }
}
