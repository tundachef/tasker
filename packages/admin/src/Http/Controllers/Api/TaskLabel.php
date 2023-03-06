<?php

namespace Admin\Http\Controllers\Api;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskLabel
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, Task $task)
    {
        $status = $task->labels()->toggle($request->label);

        return ['success' => true];
    }
}
