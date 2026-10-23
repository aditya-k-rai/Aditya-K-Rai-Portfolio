import React from 'react'
import SectionTitle from '@/components/ui/SectionTitle'
import ITBgCanvas from './ITBgCanvas'

const problems = [
  { icon: '🔓', title: 'Windows Lock Bypass', desc: 'Recover files from password-locked Windows.' },
  { icon: '🛠️', title: 'Corrupt Windows Fix', desc: 'Repair broken installs, registry, and crash loops.' },
  { icon: '⚡', title: 'Boot Error Recovery', desc: 'Windows & Linux boot repair, bootloader rebuild.' },
  { icon: '📡', title: 'Wi-Fi & Network Fix', desc: 'Dead connections, router setup, security testing.' },
  { icon: '💾', title: 'Data Recovery', desc: 'Autopsy + TestDisk for damaged or deleted files.' },
  { icon: '🤖', title: 'ESP32 / IoT Scripting', desc: 'Microcontroller code for IoT & networking.' },
]

const categories = [
  {
    num: '01',
    emoji: '🖥️',
    title: 'System Administration & OS Management',
    why: 'Operating systems, installations, and system-level issues — handled end to end.',
    skills: [
      'Windows Install & Config',
      'Linux Environment Handling',
      'OS Troubleshooting',
      'Boot Issues & Crash Recovery',
      'Driver Installation & Fixes',
      'Corrupted File Repair',
      'Performance Optimization',
      'Disk & Partition Handling',
    ],
  },
  {
    num: '02',
    emoji: '🔧',
    title: 'Technical Support & Device Troubleshooting',
    why: 'Real devices, real problems — software and connection fixes across gadgets.',
    skills: [
      'End-to-End Troubleshooting',
      'VR Headset Setup',
      'Controller & Wearable Fixes',
      'Monitor-to-System Issues',
      'Network Issue Diagnosis',
      'Cross-Device Integration',
      'Compatibility Fixes',
      'Real-Time Debugging',
    ],
  },
  {
    num: '03',
    emoji: '🛡️',
    title: 'Cybersecurity & Networking',
    why: 'Networks, security fundamentals, and ethical testing concepts.',
    skills: [
      'Network Security Basics',
      'Wi-Fi Security Testing (WPA · WPS)',
      'Network Troubleshooting',
      'Vulnerability Awareness',
      'ESP32 Scripting (IoT)',
      'Penetration Testing Concepts',
      'Authentication & Access Control',
      'System Security Hygiene',
    ],
  },
  {
    num: '04',
    emoji: '🔍',
    title: 'Data Recovery & Digital Forensics',
    why: 'Advanced recovery from damaged, corrupted, or locked systems.',
    skills: [
      'Damaged System Recovery',
      'File Recovery Without OS',
      'Disk Analysis',
      'Autopsy & TestDisk',
      'Deleted File Restore',
      'Storage Device Investigation',
      'File System Forensics',
      'Windows Security Bypass & Extract',
    ],
  },
]

export default function ITSpecialist() {
  return (
    <section id="itSpecialist" className="projectSection" style={{ position: 'relative' }}>
      <ITBgCanvas />
      <SectionTitle base="IT Special" fade="ist" full="IT Specialist" />

      <div className="it-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <p className="it-intro">
          Multi-skilled IT professional with expertise in System Administration, Technical Troubleshooting,
          Cybersecurity fundamentals, and Data Recovery. Experienced in handling OS-level issues, device
          connectivity, and forensic data analysis using tools like Autopsy and TestDisk.
        </p>

        {/* Problems I Solve */}
        <div className="it-solve">
          <div className="it-solve-label">Problems I Solve</div>
          <div className="it-solve-grid">
            {problems.map((p, idx) => (
              <div key={idx} className="it-solve-card" data-solve={idx + 1}>
                <span className="it-solve-icon">{p.icon}</span>
                <div className="it-solve-text">
                  <div className="it-solve-title">{p.title}</div>
                  <div className="it-solve-desc">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categorized Specializations */}
        <div className="it-categories">
          {categories.map((cat, idx) => (
            <article key={idx} className="it-cat" data-cat={idx + 1}>
              <div className="it-cat-head">
                <span className="it-cat-badge">{cat.num}</span>
                <span className="it-cat-emoji">{cat.emoji}</span>
              </div>
              <h4 className="it-cat-title">{cat.title}</h4>
              <p className="it-cat-why">{cat.why}</p>
              <ul className="it-cat-skills">
                {cat.skills.map((s, sIdx) => (
                  <li key={sIdx}>{s}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
