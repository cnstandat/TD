using System;

namespace TD.Models
{
    [Flags]
    public enum CaptchaType
    {
        reCaptchaV1,
        reCaptchaV2,
        Invisible_reCaptcha,
        SolveMedia,
        Geetest,
        Custom
    }
    [Flags]
    public enum FaucetType
    {
        FaucetHub,
        FaucetSystem,
        Direct
    }
}