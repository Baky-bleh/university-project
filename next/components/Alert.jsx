import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import {alertService, AlertType} from "./Alert.service";

export { Alert };

Alert.propTypes = {
    id: PropTypes.string,
    fade: PropTypes.bool
};

Alert.defaultProps = {
    id: 'default-alert',
    fade: true
};

function Alert({ id, fade }) {
    const mounted = useRef(false);
    const router = useRouter();
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        mounted.current = true;

        // subscribe to new alert notifications
        const subscription = alertService.onAlert(id)
            .subscribe(alert => {
                // clear alerts when an empty alert is received
                if (!alert.message) {
                    setAlerts(alerts => {
                        // filter out alerts without 'keepAfterRouteChange' flag
                        const filteredAlerts = alerts.filter(x => x.keepAfterRouteChange);

                        // remove 'keepAfterRouteChange' flag on the rest
                        return omit(filteredAlerts, 'keepAfterRouteChange');
                    });
                } else {
                    // add alert to array with unique id
                    alert.itemId = Math.random();
                    setAlerts(alerts => ([...alerts, alert]));

                    // auto close alert if required
                    if (alert.autoClose) {
                        setTimeout(() => removeAlert(alert), 6000);
                    }
                }
            });


        // clear alerts on location change
        const clearAlerts = () => alertService.clear(id);
        router.events.on('routeChangeStart', clearAlerts);

        // clean up function that runs when the component unmounts
        return () => {
            mounted.current = false;

            // unsubscribe to avoid memory leaks
            subscription.unsubscribe();
            router.events.off('routeChangeStart', clearAlerts);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function omit(arr, key) {
        return arr.map(obj => {
            const { [key]: omitted, ...rest } = obj;
            return rest;
        });
    }

    function removeAlert(alert) {
        if (!mounted.current) return;

        if (fade) {
            // fade out alert
            setAlerts(alerts => alerts.map(x => x.itemId === alert.itemId ? { ...x, fade: true } : x));

            // remove alert after faded out
            setTimeout(() => {
                setAlerts(alerts => alerts.filter(x => x.itemId !== alert.itemId));
            }, 250);
        } else {
            // remove alert
            setAlerts(alerts => alerts.filter(x => x.itemId !== alert.itemId));
        }
    };

    function cssClasses(alert) {
        if (!alert) return;

        const classes = ['alert', 'alert-dismissable'];

        const alertTypeClass = {
            [AlertType.Success]: 'text-white px-6 py-4 border-0 rounded relative mb-4 bg-green-500 animate-fade-in-down',
            [AlertType.Error]: 'text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500 animate-fade-in-down',
            [AlertType.Info]: 'text-white px-6 py-4 border-0 rounded relative mb-4 bg-slate-500 animate-fade-in-down',
            [AlertType.Warning]: 'text-white px-6 py-4 border-0 rounded relative mb-4 bg-amber-500 animate-fade-in-down'
        }

        classes.push(alertTypeClass[alert.type]);

        if (alert.fade) {
            classes.push('fade');
        }

        return classes.join(' ');
    }

    if (!alerts.length) return null;

    return (
        <div>
            {alerts.map((alert, index) =>
                <div key={index} className={cssClasses(alert)} onClick={() => removeAlert(alert)}>
                    <span className="text-xl inline-block mr-5 align-middle">
                        <i className="fas fa-bell"></i>
                    </span>
                    <span className="inline-block align-middle mr-8" dangerouslySetInnerHTML={{ __html: alert.message }}></span>
                    <button className="absolute bg-transparent text-2xl leading-none right-0 mr-6 outline-none focus:outline-none" >&times; </button>
                </div>
            )}
        </div>
    );
}