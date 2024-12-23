<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
/**
 * @OA\Tag(
 *     name="Eman Esmail",
 *     description="Api Documentation"
 * )
 * @OA\Info(
 *     version="1.0",
 *     title=" API Documentation  ",
 *     description="API Documentation Of Accessories Project",
 *     @OA\Contact(name="Swagger API ")
 * )
 *  @OA\SecurityScheme(
 *     type="http",
 *     securityScheme="bearerAuth",
 *     scheme="bearer",
 *     bearerFormat="JWT"
 * )
 * @OA\Server(
 *     url="/api/v1",
 * )
 */


class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
}
