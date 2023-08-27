namespace WebApi.Authorization;

using WebApi.Services;

public class JwtMiddleware
{
    private readonly RequestDelegate _next;

    public JwtMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    // Create a generic for each invoked context
    public async Task Invoke(HttpContext context, IUserService userService, ISoundService soundService, IJwtUtils jwtUtils)
    {
        var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
        var userId = jwtUtils.ValidateToken(token);
        var permission = 0;
        if (userId != null)
        {
            // attach user to context on successful jwt validation
            context.Items["User"] = userService.GetById(userId.Value);
            permission = userService.GetUserPermission(userId.Value);
            // validate user then show database
        }
        if (userId != null && permission > 0)
        {
            context.Items["Sound"] = soundService.GetAll();

        }

        await _next(context);
    }
}