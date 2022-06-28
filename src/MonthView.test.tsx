import React from 'react';
import { beforeEach, afterEach, test, expect, vi } from 'vitest';
import { act as actRender, create, ReactTestRenderer, ReactTestRendererJSON } from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';
import { Event as EventType } from './type';
import { DateButton, MonthView } from './MonthView';

let container: HTMLDivElement | null = null;
beforeEach(async () => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    if (container) {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    }
});

let component: ReactTestRenderer | null = null;
actRender(() => {
    component = create(<MonthView month={0} year={2022} />);
});

test('render DateButton components', () => {
    const dateButtonsInJanuary = component?.root.findAllByType(DateButton);
    expect(dateButtonsInJanuary).toHaveLength(42);
    const grayedOutdateButtonsInJanuary = component?.root
        .findAllByProps({ tabIndex: -1 })
        .filter((b) => b.type === 'button');
    expect(grayedOutdateButtonsInJanuary).toHaveLength(11);

    actRender(() => {
        component?.update(<MonthView month={1} year={2022} />);
    });
    const dateButtonsInFebuary = component?.root.findAllByType(DateButton);
    expect(dateButtonsInFebuary).toHaveLength(35);
    const grayOutdateButtonsInFebuary = component?.root
        .findAllByType('button')
        .filter((b) => b.props['tabIndex'] === -1);
    expect(grayOutdateButtonsInFebuary).toHaveLength(7);
});

test('mount to DOM', () => {
    act(() => {
        render(<MonthView month={1} year={2022} className="abc" />, container);
    });

    const root = container?.querySelector('>div');
    expect(root?.className).toBe(
        'bg-sheet grid grid-rows-[1fr_repeat(5,_2fr)] grid-cols-7 auto-rows-[2fr] h-full text-normal abc',
    );
    expect(root?.querySelectorAll('div[class~=text-day]')).toHaveLength(7);
});

test('click event', () => {
    const dt = new Date(2022, 0, 1, 12, 0, 0, 0);
    const nextDt = new Date(2022, 0, 2, 12, 0, 0, 0);
    const events = [
        { start: new Date(dt), minutes: 30, title: 'event title 1' },
        {
            start: new Date(nextDt.setHours(nextDt.getHours() + 1)),
            minutes: 30,
            title: 'event title 2a',
        },
        {
            start: new Date(nextDt.setHours(nextDt.getHours() + 1)),
            minutes: 30,
            title: 'event title 2b',
        },
    ];
    const clickEvent = vi.fn(() => 0);
    act(() => {
        render(<MonthView month={0} year={2022} events={events} onClick={clickEvent} />, container);
    });

    const btn = container?.querySelector('button[title="2022-01-01"]');
    expect(btn?.textContent).toBe('1January12:00 am event title 1');

    act(() => {
        btn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(clickEvent).toBeCalledTimes(1);
    expect(clickEvent.mock.calls[0]).toHaveLength(3);

    const returnedDate = clickEvent.mock.calls[0][0] as unknown as Date;
    expect(returnedDate.getFullYear()).toBe(2022);
    expect(returnedDate.getMonth()).toBe(0);
    expect(returnedDate.getDate()).toBe(1);

    const returnedEvents = clickEvent.mock.calls[0][1] as unknown as EventType[];
    expect(returnedEvents).toHaveLength(1);
    expect(returnedEvents[0].start.getFullYear()).toBe(2022);
    expect(returnedEvents[0].start.getMonth()).toBe(0);
    expect(returnedEvents[0].start.getDate()).toBe(1);
    expect(returnedEvents[0].start.getHours()).toBe(12);
    expect(returnedEvents[0].start.getMinutes()).toBe(0);
    expect(returnedEvents[0].minutes).toBe(30);
    expect(returnedEvents[0].title).toBe('event title 1');

    const btn2 = container?.querySelector('button[title="2022-01-02"]');
    expect(btn2?.textContent).toBe('21:00 pm event title 2a2:00 pm event title 2b');
    act(() => {
        btn2?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(clickEvent).toBeCalledTimes(2);
    expect(clickEvent.mock.calls).toHaveLength(2);
    expect(clickEvent.mock.calls[1][1]).toHaveLength(2);
});

test('MonthView component snapshot', () => {
    const component = create(<MonthView month={0} year={2022} />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
});

function toJson(component: ReactTestRenderer) {
    const result = component.toJSON();
    expect(result).toBeDefined();
    return result as ReactTestRendererJSON;
}
