<?php

namespace Admin\Support;

use App\Models\FavoriteProject;
use App\Models\Project;
use Illuminate\Support\Facades\Auth;
use JsonSerializable;
use Laranext\Span\Span;

class AppData implements JsonSerializable
{
    protected $config = [];

    /**
     * Create a new instance.
     */
    public function __construct()
    {
        $this->handle();
    }

    /**
     * Prepare configs.
     *
     * @return void
     */
    protected function handle()
    {
        $this->config = [
            'csrf_token' => csrf_token(),
            'prefix' => Span::prefix(),
            'user' => auth()->user()->only(['id', 'name', 'email', 'avatar']),
            'options' => [
                'email_config' => option('email_config'),
                'global_update_notification' => option('global_update_notification'),
                'demo' => $this->isStandaloneDemo() && env('APP_DEMO', false),
                'is_standalone_demo' => $this->isStandaloneDemo(),
            ],
            'permissions' => auth()->user()->allPermissions(),
            // 'favorites' => FavoriteProject::whereUserId(auth()->id())
            //                     ->with('project')
            //                     ->get(),
            // 'projects' => Project::get(),
            'translations' => json_decode(file_get_contents(base_path('lang/'.option('app_locale', 'en').'.json')), true),
            'app_name' => env('APP_NAME', 'Spack'),
            'app_logo' => option('app_logo'),
            'is_super_admin' => auth()->user()->isSuperAdmin(),
            'locale' => option('app_locale'),
            'app_updates' => option('app_updates'),
            'purchase_code' => env('PURCHASE_CODE'),
            'PUSHER_APP_KEY' => config('broadcasting.connections.pusher.key'),
            'PUSHER_APP_CLUSTER' => config('broadcasting.connections.pusher.options.cluster'),
        ];
    }

    protected function isStandaloneDemo()
    {
        if (request()->getHttpHost() == 'localhost') {
            return false;
        }

        $host = explode('.', request()->getHttpHost());

        if (isset($host[1]) && $host[1] == 'spackdemo') {
            return true;
        }

        return false;
    }

    /**
     * Prepare the field for JSON serialization.
     *
     * @return array
     */
    public function jsonSerialize()
    {
        return $this->config;
    }
}
