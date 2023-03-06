<?php

namespace Admin\Http\Controllers\Api;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskComplete
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
        if ($task->completed_at) {
            $task->update(['completed_at' => null]);

            return ['success' => true, 'completed_at' => null];
        }

        $task->update([
            'completed_at' => now(),
        ]);

        return ['success' => true, 'completed_at' => 'true'];
    }
}
