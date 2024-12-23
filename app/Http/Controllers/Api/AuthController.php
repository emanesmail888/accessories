<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Validation\Rules\Password as RulesPassword;
use Illuminate\Validation\ValidationException;
use App\Mail\ResetPasswordMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;




class AuthController extends Controller
{


     /**
     * @OA\Post(
     *      path="/api/v1/signup",
     *      operationId="signup",
     *      tags={"Authentication"},
     *      summary="SignUp To Site",
     *      description="SignUp To Site",
     *      @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *            required={"name", "email","password","password_confirmation"},
     *            @OA\Property(property="name", type="string", format="string", example="Test category Title"),
     *            @OA\Property(property="email", type="string", format="string", example="info@gmail.com"),
     *            @OA\Property(property="password", type="string", format="string", example="Aa133456@"),
     *            @OA\Property(property="password_confirmation", type="string", format="string", example="Aa133456@"),
     *         ),
     *      ),
     *     @OA\Response(
     *          response=200, description="Success",
     *          @OA\JsonContent(
     *             @OA\Property(property="status", type="integer", example=""),
     *             @OA\Property(property="data",type="object")
     *          )
     *       )
     *  )
     */
    public function signup(SignupRequest $request): Response
    {
        $data = $request->validated();
        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }




     /**
     * @OA\Post(
     *      path="/login",
     *      operationId="login",
     *      tags={"Authentication"},
     *      summary="Login To Site",
     *      description="Login To Site",
     *      @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *            required={"email","password"},
     *            @OA\Property(property="email", type="string", format="string", example="info@gmail.com"),
     *            @OA\Property(property="password", type="string", format="string", example="Aa133456@"),
     *         ),
     *      ),
     *     @OA\Response(
     *          response=200, description="Success",
     *          @OA\JsonContent(
     *             @OA\Property(property="status", type="integer", example=""),
     *             @OA\Property(property="data",type="object")
     *          )
     *       )
     *  )
     */

    public function login(LoginRequest $request): Response
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Provided email or password is incorrect'
            ], 422);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }



    /**
     * @OA\Post(
     *     path="/logout",
     *     summary="Logout a user",
     *     tags={"Authentication"},
     *     @OA\Response(
     *         response="204",
     *         description="User Logout successfully"),
     *         security={{"bearerAuth":{}}}

    * )
    */

    public function logout(Request $request): Response
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response([
            'message'=> 'User Logout successfully'
        ], 204);
    }


    /**
     * @OA\Get(
     *     path="/user",
     *     tags={"Authentication"},
     *     summary="Get logged-in user details",
     *     @OA\Response(response="200", description="Success"),
     *     security={{"bearerAuth":{}}}
     * )
     */
    public function getUserDetails(Request $request): JsonResponse
    {
        $user = $request->user();
        return response()->json(['user' => $user], 200);
    }


    public function forgotPassword(Request $request): array
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $response = Password::sendResetLink(
            $request->only('email'),
            function ($user, $token) {
                $user->sendPasswordResetNotification($token);
            }
        );

        if ($response == Password::RESET_LINK_SENT) {
            return [
                'status' => __('A password reset link has been sent to your email.'),
            ];
        }

        throw ValidationException::withMessages([
            'email' => [__($response)],
        ]);
    }


    public function reset(Request $request): JsonResponse
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => ['required', 'confirmed', RulesPassword::defaults()],
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($request->password),
                    'remember_token' => Str::random(60),
                ])->save();

                $user->tokens()->delete();

                event(new PasswordReset($user));
            }
        );

        if ($status == Password::PASSWORD_RESET) {
            return response([
                'message'=> 'Password reset successfully'
            ]);
        }

        return response([
            'message'=> __($status)
        ], 500);

    }




}
