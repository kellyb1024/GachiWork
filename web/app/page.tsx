import Image from "next/image";
import Link from "next/link";

export default function SignupStep1() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Logo + Lockup */}
        <div className="flex items-center gap-3 mb-12">
          <Image
            src="/logo.png"
            alt="GachiWork"
            width={56}
            height={56}
            priority
            className="rounded-xl shadow-e1"
          />
          <span className="text-3xl font-bold leading-none tracking-tight">
            <span style={{ color: "var(--primary)" }}>Gachi</span>
            <span style={{ color: "var(--secondary)" }}>Work</span>
          </span>
        </div>

        {/* Hero */}
        <h1 className="text-4xl font-bold tracking-tight text-ink text-center leading-tight mb-3">
          같이 일해요
        </h1>
        <p className="text-base text-ink-soft text-center leading-relaxed max-w-sm mb-10">
          한국에서 일하는 모든 사람을 위한
          <br />
          정보·전문가·동료 네트워크
        </p>

        {/* Form */}
        <form className="w-full flex flex-col gap-5">
          {/* Language */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="lang" className="text-sm font-semibold text-ink">
              Language
            </label>
            <select
              id="lang"
              name="lang"
              defaultValue="ko"
              className="h-11 px-4 rounded-lg border border-line bg-card text-ink text-base font-sans outline-none focus:border-primary focus:ring-2 focus:ring-primary-50 transition"
            >
              <option value="ko">한국어</option>
              <option value="en">English</option>
              <option disabled>──────────</option>
              <option value="id">Bahasa Indonesia</option>
              <option value="vi">Tiếng Việt</option>
            </select>
            <span className="text-xs text-neutral">
              자기 모국어를 선택하세요. 언제든지 바꿀 수 있어요.
            </span>
          </div>

          {/* Country */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="country" className="text-sm font-semibold text-ink">
              Country / Nationality
            </label>
            <select
              id="country"
              name="country"
              defaultValue=""
              className="h-11 px-4 rounded-lg border border-line bg-card text-ink text-base font-sans outline-none focus:border-primary focus:ring-2 focus:ring-primary-50 transition"
              required
            >
              <option value="" disabled>
                Select your country
              </option>
              <option value="bd">Bangladesh</option>
              <option value="kh">Cambodia</option>
              <option value="cn">China</option>
              <option value="tl">East Timor</option>
              <option value="id">Indonesia</option>
              <option value="kg">Kyrgyzstan</option>
              <option value="la">Laos</option>
              <option value="mn">Mongolia</option>
              <option value="mm">Myanmar</option>
              <option value="np">Nepal</option>
              <option value="pk">Pakistan</option>
              <option value="ph">Philippines</option>
              <option value="lk">Sri Lanka</option>
              <option value="th">Thailand</option>
              <option value="uz">Uzbekistan</option>
              <option value="vn">Vietnam</option>
            </select>
          </div>

          {/* Primary CTA */}
          <button
            type="button"
            className="mt-4 h-12 w-full rounded-lg bg-primary text-white text-base font-semibold flex items-center justify-center gap-2 hover:bg-primary-700 transition active:translate-y-px"
          >
            <span
              aria-hidden="true"
              className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white text-primary text-xs font-bold"
            >
              G
            </span>
            Continue with Google
          </button>

          {/* Secondary CTA */}
          <button
            type="button"
            className="h-12 w-full rounded-lg border border-line bg-card text-ink text-base font-medium hover:bg-line-soft transition"
          >
            이메일로 시작하기
          </button>
        </form>

        {/* Footer */}
        <p className="mt-10 text-sm text-neutral">
          이미 계정이 있으세요?{" "}
          <Link
            href="/login"
            className="text-primary font-semibold hover:underline"
          >
            로그인
          </Link>
        </p>

        {/* Privacy hint */}
        <p className="mt-6 text-xs text-neutral text-center max-w-xs leading-relaxed">
          가입 시{" "}
          <Link href="/terms" className="underline hover:text-ink-soft">
            이용약관
          </Link>{" "}
          과{" "}
          <Link href="/privacy" className="underline hover:text-ink-soft">
            개인정보처리방침
          </Link>
          에 동의하게 됩니다.
        </p>
      </div>
    </main>
  );
}
