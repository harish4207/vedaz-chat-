import { ArrowRight, MessageCircleMore, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function Login() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) {
      setError('Username is required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const { data } = await api.post('/users/login', { username: trimmed });
      setUser(data);
      navigate('/chat');
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-full items-center justify-center px-4 py-10">
      <section className="glass w-full max-w-5xl overflow-hidden rounded-[2rem] shadow-glow">
        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative overflow-hidden bg-slate-950 p-8 text-white sm:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.35),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(96,165,250,0.2),transparent_25%)]" />
            <div className="relative flex h-full flex-col justify-between gap-10">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200">
                <Sparkles className="h-4 w-4 text-sky-300" />
                PulseChat
              </div>
              <div className="space-y-5">
                <h1 className="max-w-md text-4xl font-semibold tracking-tight sm:text-6xl">
                  Real-time messaging with a premium feel.
                </h1>
                <p className="max-w-lg text-sm leading-6 text-slate-300 sm:text-base">
                  Fast login, live presence, typing cues, and smooth motion all in one clean chat experience.
                </p>
              </div>
              <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Socket.io live sync</div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">MongoDB history</div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Dark mode ready</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center bg-white p-8 sm:p-12">
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
              <div className="space-y-2">
                <p className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">
                  <MessageCircleMore className="h-4 w-4" />
                  Welcome back
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Choose a username</h2>
                <p className="text-sm leading-6 text-slate-600">
                  Keep it simple. You can jump into the chat immediately and start testing the real-time flow.
                </p>
              </div>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-700">Username</span>
                <input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="e.g. harish"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100"
                />
              </label>

              {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-600 px-5 py-3.5 font-medium text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-brand-400"
              >
                {loading ? 'Signing in...' : 'Continue'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}