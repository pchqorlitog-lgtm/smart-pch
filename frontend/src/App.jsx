import { useEffect, useState } from 'react'

const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'

export default function App() {
    const [telegramUser, setTelegramUser] = useState(null)
    const [status, setStatus] = useState('loading')

    useEffect(() => {
        const telegram = window.Telegram?.WebApp
        if (!telegram) {
            setStatus('no-telegram')
            return
        }

        const user = telegram.initDataUnsafe?.user
        if (user) {
            setTelegramUser(user)
        }

        telegram.ready()
        telegram.expand()
        setStatus('ready')

        const initData = telegram.initData
        if (initData) {
            fetch(`${apiBase}/telegram/validate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ initData }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.valid) {
                        setStatus('validated')
                    } else {
                        setStatus('invalid')
                    }
                })
                .catch(() => setStatus('invalid'))
        }
    }, [])

    const stats = [
        { label: 'Buyurtmalar', value: '1.2K' },
        { label: 'Faol kuryerlar', value: '88' },
        { label: "O'rtacha yetkazish", value: '18 min' },
    ]

    const modules = [
        'Dehqon bozori',
        "Mahalla do'konlari",
        'Supermarketlar',
        'GPS tracking',
        "QR to'lov",
        'Push-to-talk',
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 p-5 text-slate-800">
            <div className="mx-auto max-w-md rounded-3xl bg-white p-6 shadow-lg">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-blue-600">Smart Market</p>
                        <h1 className="text-2xl font-bold">Uzbekistan</h1>
                    </div>
                    <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        {status === 'validated' ? 'Validated' : status === 'ready' ? 'Online' : 'Pending'}
                    </div>
                </div>

                {telegramUser && (
                    <div className="mb-5 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
                        <div className="font-semibold">Telegram foydalanuvchi</div>
                        <div>{telegramUser.first_name} {telegramUser.last_name || ''}</div>
                        <div className="text-xs text-slate-500">@{telegramUser.username || 'unknown'}</div>
                    </div>
                )}

                <div className="mb-6 grid grid-cols-3 gap-3">
                    {stats.map((item) => (
                        <div key={item.label} className="rounded-2xl bg-slate-50 p-3 text-center">
                            <div className="text-lg font-bold text-slate-900">{item.value}</div>
                            <div className="text-[10px] text-slate-500">{item.label}</div>
                        </div>
                    ))}
                </div>

                <div className="mb-6 rounded-2xl bg-blue-600 p-4 text-white">
                    <div className="text-xs uppercase tracking-[0.2em] text-blue-100">Live status</div>
                    <div className="mt-2 text-xl font-semibold">Kuryer yo'lda</div>
                    <div className="mt-1 text-sm text-blue-100">Mijoz manzili: Yunusobod, Tashkent</div>
                </div>

                <div>
                    <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Asosiy modullar
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {modules.map((module) => (
                            <span
                                key={module}
                                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
                            >
                                {module}
                            </span>
                        ))}
                    </div>
                </div>

                <button className="mt-6 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white">
                    Buyurtma berish
                </button>
            </div>
        </div>
    )
}
