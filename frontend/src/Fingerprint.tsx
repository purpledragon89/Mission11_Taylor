import { getFingerprint } from '@thumbmarkjs/thumbmarkjs'
import React from 'react';
import { useEffect, useState } from 'react'

export const Fingerprint = () => {
    const [fingerprint, setFingerprint] = useState<string | null>(null)

    useEffect(() => {
        getFingerprint().then((fp) => setFingerprint(fp)).catch(console.error)
    }, [])

    return <div>{fingerprint ? `Fingerprint: ${fingerprint}` : 'Loading fingerprint...'}</div>
};

export default Fingerprint;
