import { Component, type ErrorInfo, type ReactNode } from 'react'

export class ErrorBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }, { error: Error | null }> {
  state: { error: Error | null } = { error: null }
  static getDerivedStateFromError(error: Error) { return { error } }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error('[ErrorBoundary]', error, info.componentStack) }
  render() {
    if (this.state.error) return this.props.fallback ?? (
      <div style={{ padding: 24, margin: 16, borderRadius: 12, border: '1px solid #e53935', background: '#fff', color: '#0b1f44', fontFamily: 'Inter,system-ui,sans-serif' }} role="alert">
        <h2 style={{ margin: '0 0 8px', fontSize: '1.1rem' }}>This section failed to load</h2>
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: 13, color: '#52647A' }}>{this.state.error.message}</pre>
      </div>
    )
    return this.props.children
  }
}
