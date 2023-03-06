<?php

namespace Admin\Http\Controllers\Api;

use App\Models\Task;
use AhsanDev\Support\Recurring;
use Illuminate\Http\Request;

class TaskRecurring
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
        // dd($request->repeat_on);
        // return $request->all();
        $recurring = Recurring::make($request->all());

        // return $recurring->pattern();

        // $task = Task::find(1);

        $task->update([
            'recurring_at' => $recurring->nextIteration(),
            'meta' => [
                'recurring' => $recurring->pattern(),
            ],
        ]);

        return $task;

        return ['success' => true];
    }
}
