import { render, RenderResult } from '@testing-library/svelte';
import type { ComponentType } from 'svelte';
import { vi } from 'vitest';

/**
 * Component Render Helpers
 * 
 * Utilities for rendering Svelte components with common setup
 */

export interface RenderOptions {
  props?: Record<string, any>;
  context?: Record<string, any>;
}

/**
 * Render a component with default options
 */
export function renderComponent<T extends ComponentType>(
  component: T,
  options: RenderOptions = {}
): RenderResult<T> {
  return render(component, {
    props: options.props || {},
    ...options.context
  }) as any;
}

/**
 * Render a component and wait for it to be ready
 */
export async function renderAndWait<T extends ComponentType>(
  component: T,
  options: RenderOptions = {}
): Promise<RenderResult<T>> {
  const result = renderComponent(component, options);
  await new Promise(resolve => setTimeout(resolve, 0));
  return result;
}

/**
 * Render a component with props and return the container
 */
export function renderWithProps<T extends ComponentType>(
  component: T,
  props: Record<string, any>
): RenderResult<T> {
  return renderComponent(component, { props });
}

/**
 * Create a mock event handler
 */
export function createMockEventHandler() {
  const handler = {
    fn: vi.fn(),
    getCallCount: () => handler.fn.mock.calls.length,
    getLastCall: () => handler.fn.mock.calls[handler.fn.mock.calls.length - 1],
    wasCalled: () => handler.fn.mock.calls.length > 0,
    wasCalledTimes: (times: number) => handler.fn.mock.calls.length === times,
    reset: () => handler.fn.mockReset()
  };
  return handler;
}
