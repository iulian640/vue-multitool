import { describe, it, expect } from 'vitest';
import { createWrapperError, mount } from '@vue/test-utils';
import CalculatorCard from '../CalculatorCard.vue';

describe('CalculatorCard', () => {
    it('Al montar el display muestra 0', () => {
        const wrapper = mount(CalculatorCard)

        expect(wrapper.find('.calc__number').text()).toBe('0')
    })

    it('Pulsar 5 muestra 5', async () => {
        const wrapper = mount(CalculatorCard);

        const button5 = wrapper.findAll('button').find(n => n.text() === '5');

        await button5.trigger('click');

        expect(wrapper.find('.calc__number').text()).toBe('5');
    })

    it('Pulsar 1 y 2 deja 12', async () => {
        const wrapper = mount(CalculatorCard);

        const button1 = wrapper.findAll('button').find(n => n.text() === "1");
        const button2 = wrapper.findAll('button').find(n => n.text() === "2");

        await button1.trigger('click');
        await button2.trigger('click');

        expect(wrapper.find('.calc__number').text()).toBe('12');
    })

    it('5 + 3 dabe dar 8', async () => {
        const wrapper = mount(CalculatorCard);

        const button5 = wrapper.findAll('button').find(n => n.text() === "5")
        const buttonPlus = wrapper.findAll('button').find(n => n.text() === "+")
        const button3 = wrapper.findAll('button').find(n => n.text() === "3")
        const buttonEquals = wrapper.findAll('button').find(n => n.text() === "=")

        await button5.trigger('click');
        await buttonPlus.trigger('click');
        await button3.trigger('click');
        await buttonEquals.trigger('click');

        expect(wrapper.find('.calc__number').text()).toBe('8')
    })

    it('5 - 3 debe dar 2', async () => {
        const wrapper = mount(CalculatorCard);

        const button5 = wrapper.findAll('button').find(n => n.text() === "5");
        const buttonMinus = wrapper.findAll('button').find(n => n.text() === "-");
        const button3 = wrapper.findAll('button').find(n => n.text() === "3");
        const buttonEquals = wrapper.findAll('button').find(n => n.text() === "=");

        await button5.trigger('click');
        await buttonMinus.trigger('click');
        await button3.trigger('click');
        await buttonEquals.trigger('click');

        expect(wrapper.find('.calc__number').text()).toBe('2')

    })

    it('2 x 3 debe dar 6', async () => {
        const wrapper = mount(CalculatorCard);

        const button2 = wrapper.findAll('button').find(n => n.text() === "2");
        const buttonMultiply = wrapper.findAll('button').find(n => n.text() === "x");
        const button3 = wrapper.findAll('button').find(n => n.text() === "3");
        const buttonEquals = wrapper.findAll('button').find(n => n.text() === "=");

        await button2.trigger('click');
        await buttonMultiply.trigger('click');
        await button3.trigger('click');
        await buttonEquals.trigger('click');

        expect(wrapper.find('.calc__number').text()).toBe('6');
    })

    it('6 ÷ 2 debe dar 3', async () => {
        const wrapper = mount(CalculatorCard);

        const button6 = wrapper.findAll('button').find(n => n.text() === "6");
        const buttonDivide = wrapper.findAll('button').find(n => n.text() === "÷");
        const button2 = wrapper.findAll('button').find(n => n.text() === "2")
        const buttonEquals = wrapper.findAll('button').find(n => n.text() === "=");

        await button6.trigger('click');
        await buttonDivide.trigger('click');
        await button2.trigger('click');
        await buttonEquals.trigger('click');

        expect(wrapper.find('.calc__number').text()).toBe('3');
    })

    it('Si pulsas "6" "," y "2" debe dar 6,2', async () => {
        const wrapper = mount(CalculatorCard);

        const button6 = wrapper.findAll('button').find(n => n.text() === "6");
        const buttonComma = wrapper.findAll('button').find(n => n.text() === ",");
        const button2 = wrapper.findAll('button').find(n => n.text() === "2");

        await button6.trigger('click');
        await buttonComma.trigger('click');
        await button2.trigger('click');

        expect(wrapper.find('.calc__number').text()).toBe('6,2')
    })

    it('No permite poner mas de una coma en un numero', async () => {
        const wrapper = mount(CalculatorCard);

        const button6 = wrapper.findAll('button').find(n => n.text() === "6");
        const buttonComma = wrapper.findAll('button').find(n => n.text() === ",");
        const button1 = wrapper.findAll('button').find(n => n.text() === "1");

        await button6.trigger('click');
        await buttonComma.trigger('click');
        await buttonComma.trigger('click');
        await button1.trigger('click');

        expect(wrapper.find('.calc__number').text()).toBe('6,1')
    })

    it('CE borra el numero actual', async () => {
        const wrapper = mount(CalculatorCard);

        const button6 = wrapper.findAll('button').find(n => n.text() === "6")
        const buttonCE = wrapper.findAll('button').find(n => n.text() === "CE")

        await button6.trigger('click');
        await buttonCE.trigger('click');

        expect(wrapper.find('.calc__number').text()).toBe('0')
    })

    it('C borra toda la operación', async () => {
        const wrapper = mount(CalculatorCard);

        const button6 = wrapper.findAll('button').find(n => n.text() === "6");
        const buttonPlus = wrapper.findAll('button').find(n => n.text() === "+");
        const button2 = wrapper.findAll('button').find(n => n.text() === "2");
        const buttonC = wrapper.findAll('button').find(n => n.text() === "C")

        await button6.trigger('click');
        await buttonPlus.trigger('click');
        await button2.trigger('click');
        await buttonC.trigger('click');

        expect(wrapper.find('.calc__expression').text()).toBe('');
    })

    it('5, +, 3, +, 3, = deben dar 11 con total acumulado', async () => {
        const wrapper = mount(CalculatorCard);

        const button5 = wrapper.findAll('button').find(n => n.text() === "5");
        const buttonPlus = wrapper.findAll('button').find(n => n.text() === "+");
        const button3 = wrapper.findAll('button').find(n => n.text() === "3");
        const buttonEquals = wrapper.findAll('button').find(n => n.text() === "=")

        await button5.trigger('click');
        await buttonPlus.trigger('click');
        await button3.trigger('click');
        await buttonPlus.trigger('click');
        await button3.trigger('click')
        await buttonEquals.trigger('click');

        expect(wrapper.find('.calc__number').text()).toBe('11')
    })

    it('5, ÷, 0 da "Sin definir"', async () => {
        const wrapper = mount(CalculatorCard);

        const button5 = wrapper.findAll('button').find(n => n.text() === "5");
        const buttonDivide = wrapper.findAll('button').find(n => n.text() === "÷");
        const button0 = wrapper.findAll('button').find(n => n.text() === "0");
        const buttonEquals = wrapper.findAll('button').find(n => n.text() === "=");

        await button5.trigger('click');
        await buttonDivide.trigger('click');
        await button0.trigger('click');
        await buttonEquals.trigger('click');

        expect(wrapper.find('.calc__number').text()).toBe('Sin definir')

    })

    it('0, ÷, 0 da "Sin definir"', async () => {
        const wrapper = mount(CalculatorCard);

        const buttonDivide = wrapper.findAll('button').find(n => n.text() === "÷");
        const button0 = wrapper.findAll('button').find(n => n.text() === "0");
        const buttonEquals = wrapper.findAll('button').find(n => n.text() === "=");

        await button0.trigger('click');
        await buttonDivide.trigger('click');
        await button0.trigger('click');
        await buttonEquals.trigger('click');

        expect(wrapper.find('.calc__number').text()).toBe('Sin definir')

    })

    it('0, ÷, 0 , =, = da "Sin definir"', async () => {
        const wrapper = mount(CalculatorCard);

        const buttonDivide = wrapper.findAll('button').find(n => n.text() === "÷");
        const button0 = wrapper.findAll('button').find(n => n.text() === "0");
        const buttonEquals = wrapper.findAll('button').find(n => n.text() === "=");

        await button0.trigger('click');
        await buttonDivide.trigger('click');
        await button0.trigger('click');
        await buttonEquals.trigger('click');
        await buttonEquals.trigger('click');

        expect(wrapper.find('.calc__number').text()).toBe('Sin definir')

    })

    it('5, ÷, 0, =, pulsar un número teniendo Sin definir bloqueado, solo permite C', async () => {
        const wrapper = mount(CalculatorCard);

        const button5 = wrapper.findAll('button').find(n => n.text() === "5");
        const buttonDivide = wrapper.findAll('button').find(n => n.text() === "÷");
        const button0 = wrapper.findAll('button').find(n => n.text() === "0");
        const buttonEquals = wrapper.findAll('button').find(n => n.text() === "=");
        const button7 = wrapper.findAll('button').find(n => n.text() === "7");

        await button5.trigger('click');
        await buttonDivide.trigger('click');
        await button0.trigger('click');
        await buttonEquals.trigger('click');
        await button7.trigger('click');

        expect(wrapper.find('.calc__number').text()).toBe('Sin definir');
    })

    it('5, ÷, 0, =, C desbloquea la calculadora y 7 vuelve a escribir', async () => {
        const wrapper = mount(CalculatorCard);

        const button5 = wrapper.findAll('button').find(n => n.text() === "5");
        const buttonDivide = wrapper.findAll('button').find(n => n.text() === "÷");
        const button0 = wrapper.findAll('button').find(n => n.text() === "0");
        const buttonEquals = wrapper.findAll('button').find(n => n.text() === "=");
        const buttonC = wrapper.findAll('button').find(n => n.text() === "C");
        const button7 = wrapper.findAll('button').find(n => n.text() === "7");

        await button5.trigger('click');
        await buttonDivide.trigger('click');
        await button0.trigger('click');
        await buttonEquals.trigger('click');
        await buttonC.trigger('click');
        await button7.trigger('click');

        expect(wrapper.find('.calc__number').text()).toBe('7');
    })

    it('-, 5 hace que el valor sea -5(negativo)', async () =>
    {
        const wrapper = mount(CalculatorCard);

        const buttonMinus = wrapper.findAll('button').find(n => n.text () === "-");
        const button5 = wrapper.findAll('button').find(n => n.text () === "5");

        await buttonMinus.trigger('click');
        await button5.trigger('click');

        expect(wrapper.find('.calc__number').text()).toBe('-5')
    })

    it('si pulsamos -, -, y = no da NaN', async () =>
    {
        const wrapper = mount(CalculatorCard);

        const buttonMinus = wrapper.findAll('button').find(n => n.text () === "-");
        const buttonEquals = wrapper.findAll('button').find(n => n.text() === "=");

        await buttonMinus.trigger('click');
        await buttonMinus.trigger('click');
        await buttonEquals.trigger('click');

        expect(wrapper.find('.calc__number').text()).toBe('-')
    })


    it('123 y backspace deja 12', async () =>
    {
        const wrapper = mount(CalculatorCard);

        const button1 = wrapper.findAll('button').find(n => n.text () === "1");
        const button2 = wrapper.findAll('button').find(n => n.text() === "2");
        const button3 = wrapper.findAll('button').find(n => n.text () === "3");
        const buttonBackspace = wrapper.findAll('button').find(n => n.text() === "⌫");
        
        await button1.trigger('click');
        await button2.trigger('click');
        await button3.trigger('click');
        await buttonBackspace.trigger('click');

        expect(wrapper.find('.calc__number').text()).toBe('12')
    })

    it('1 y ⌫ nos deja en 0', async () =>
    {
        const wrapper = mount(CalculatorCard);

        const button1 = wrapper.findAll('button').find(n => n.text () === "1");
        const buttonBackspace = wrapper.findAll('button').find(n => n.text() === "⌫");
        
        await button1.trigger('click');
        await buttonBackspace.trigger('click');

        expect(wrapper.find('.calc__number').text()).toBe('0')
    })

    it('- y ⌫ nos deja en 0', async () =>
    {
        const wrapper = mount(CalculatorCard);

        const buttonMinus = wrapper.findAll('button').find(n => n.text () === "-");
        const buttonBackspace = wrapper.findAll('button').find(n => n.text() === "⌫");
        
        await buttonMinus.trigger('click');
        await buttonBackspace.trigger('click');

        expect(wrapper.find('.calc__number').text()).toBe('0')
    })

    it('Muestra 10 dígitos como máximo', async () =>
    {
        const wrapper = mount(CalculatorCard);

        const button1 = wrapper.findAll('button').find(n => n.text () === "1");
        const button2 = wrapper.findAll('button').find(n => n.text() === "2");
        const button3 = wrapper.findAll('button').find(n => n.text () === "3");
        const button4 = wrapper.findAll('button').find(n => n.text() === "4");
        const button5 = wrapper.findAll('button').find(n => n.text () === "5");
        const button6 = wrapper.findAll('button').find(n => n.text() === "6");
        const button7 = wrapper.findAll('button').find(n => n.text () === "7");
        const button8 = wrapper.findAll('button').find(n => n.text() === "8");
        const button9 = wrapper.findAll('button').find(n => n.text () === "9");
        const button0 = wrapper.findAll('button').find(n => n.text() === "0");
        

        await button1.trigger('click');
        await button2.trigger('click');
        await button3.trigger('click');
        await button4.trigger('click');
        await button5.trigger('click');
        await button6.trigger('click');
        await button7.trigger('click');
        await button8.trigger('click');
        await button9.trigger('click');
        await button0.trigger('click');
        await button0.trigger('click');

        expect(wrapper.find('.calc__number').text()).toBe('1234567890')
    })

    it('1, ÷, 3, =, 0,33333333 (8 decimales)', async () => {
        const wrapper = mount(CalculatorCard);

        const button1 = wrapper.findAll('button').find(n => n.text() === "1");
        const buttonDivide = wrapper.findAll('button').find(n => n.text() === "÷");
        const button3 = wrapper.findAll('button').find(n => n.text() === "3");
        const buttonEquals = wrapper.findAll('button').find(n => n.text() === "=");

        await button1.trigger('click');
        await buttonDivide.trigger('click');
        await button3.trigger('click');
        await buttonEquals.trigger('click');

        expect(wrapper.find('.calc__number').text()).toBe('0,33333333');
    })

    it('pulsar la tecla física 5 y recibir 5', async () => {
        const wrapper = mount(CalculatorCard);

        window.dispatchEvent(new KeyboardEvent('keydown', { key: '5'}));
        await wrapper.vm.$nextTick();
        
        expect(wrapper.find('.calc__number').text()).toBe('5');
    })

    it('teclas fisicas 2, *, 3 y enter dan 6', async () => {
        const wrapper = mount(CalculatorCard);

        window.dispatchEvent(new KeyboardEvent('keydown', { key: '2'}));
        window.dispatchEvent(new KeyboardEvent('keydown', { key: '*'}));
        window.dispatchEvent(new KeyboardEvent('keydown', { key: '3'}));
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter'}));
        await wrapper.vm.$nextTick();

        expect(wrapper.find('.calc__number').text()).toBe('6');
    })

    it('"enter" y display sigue en 0', async () => {
        const wrapper = mount(CalculatorCard);

        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter'}));
        await wrapper.vm.$nextTick();

        expect(wrapper.find('.calc__number').text()).toBe('0');
    })

    it('teclas fisicas 1, 2 y Backspace dejan 1', async () => {
        const wrapper = mount(CalculatorCard);

        window.dispatchEvent(new KeyboardEvent('keydown', { key: '1'}));
        window.dispatchEvent(new KeyboardEvent('keydown', { key: '2'}));
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace'}));
        await wrapper.vm.$nextTick();

        expect(wrapper.find('.calc__number').text()).toBe('1');
    })

    it('teclas fisicas 1 y "," escriben 1,', async () => {
        const wrapper = mount(CalculatorCard);

        window.dispatchEvent(new KeyboardEvent('keydown', { key: '1'}));
        window.dispatchEvent(new KeyboardEvent('keydown', { key: ','}));
        await wrapper.vm.$nextTick();

        expect(wrapper.find('.calc__number').text()).toBe('1,');
    })

    it('teclas fisicas 1 y "." del numpad escriben 1,', async () => {
        const wrapper = mount(CalculatorCard);

        window.dispatchEvent(new KeyboardEvent('keydown', { key: '1'}));
        window.dispatchEvent(new KeyboardEvent('keydown', { key: '.'}));
        await wrapper.vm.$nextTick();

        expect(wrapper.find('.calc__number').text()).toBe('1,');
    })

    it('2, ÷, 2, =, x, 2, debe dar 2', async() =>{
    
    const wrapper = mount(CalculatorCard);

        const button2 = wrapper.findAll('button').find(n => n.text() === "2");
        const buttonDivide = wrapper.findAll('button').find(n => n.text() === "÷");
        const buttonMultiply = wrapper.findAll('button').find(n => n.text() === "x");
        const buttonEquals = wrapper.findAll('button').find(n => n.text() === "=");

        await button2.trigger('click');
        await buttonDivide.trigger('click');
        await button2.trigger('click');
        await buttonEquals.trigger('click');
        await buttonMultiply.trigger('click');
        await button2.trigger('click');
        await buttonEquals.trigger('click');
        
        expect(wrapper.find('.calc__number').text()).toBe('2');
        })
})