<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('activity_logs', function (Blueprint $table) {
            $table->dropColumn(['upid', 'status', 'updated_at', 'created_at']);

            $table->timestamp('timestamp')->after('properties')->useCurrent()->onUpdate(null);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('activity_logs', function (Blueprint $table) {
            $table->dropColumn('timestamp');

            $table->after('event', function (Blueprint $table) {
                $table->string('upid')->nullable();
                $table->string('status')->default('ok');
            });

            $table->timestamps();
        });
    }
};
