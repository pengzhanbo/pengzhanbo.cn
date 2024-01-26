import { computed } from "vue"
import type { ToRefs } from 'vue'

export type StampType = 
  // github stamps
  | 'g' // github source
  | 'gs' // github stars
  | 'gl' // github license
  // npm stamps
  | 'nv' // npm version
  | 'ndt' // npm downloads totals
  | 'ndd' // npm downloads daily
  | 'ndw' // npm downloads weekly
  | 'ndm' // npm downloads monthly
  | 'ndy' // npm downloads yearly

export interface StampItem {
  type: StampType
  label?: string
  color?: string
  labelColor?: string
  repo?: string
  subpath?: string
  package?: string
}

export interface StampsProps {
  stamps: StampType | StampItem | (StampItem | StampType)[]
  repo: string
  subpath?: string
  package?: string
}

export interface StampInfo {
  img: string
  link?: string
  alt?: string
}

const hostname = 'https://img.shields.io'
const github = 'https://github.com'
const npm = 'https://www.npmjs.com/package'
const defaultLabelColor = '1B3C4A'
const defaultColor = '32A9C3'

export function useStamps({
  stamps,
  repo,
  subpath,
  package: packageName
}: ToRefs<StampsProps>) {
  const info = computed(() => {
    const [, repoName] = repo.value.split('/')
    const npmPackage = packageName?.value ?? repoName
    return { repo: repo.value, npmPackage, subpath: subpath?.value }
  })
  
  const stampList = computed(() => {
    if (!stamps.value) {
      return []
    }

    const list = Array.isArray(stamps.value)
      ? stamps.value
      : typeof stamps.value === 'string' && stamps.value.includes(',')
        ? stamps.value.split(',').map(item => item.trim()) as StampType[]
        : [stamps.value]
  
    return list.map(item => {
      if (typeof item === 'string') {
        return {
          type: item,
          repo: info.value.repo,
          package: info.value.npmPackage,
          subpath: info.value.subpath,
        }
      } else {
        return {
          ...item,
          repo: item.repo ?? info.value.repo,
          package: item.package ?? info.value.npmPackage,
          subpath: item.subpath ?? info.value.subpath,
        }
      }
    })
  })

  return stampList
}

export function resolveStamp(stamp: StampItem): StampInfo {
  const color = stamp.color ?? defaultColor
  const labelColor = stamp.labelColor ?? defaultLabelColor
  const githubLink = `${github}/${stamp.repo}${stamp.subpath ? `/${stamp.subpath}` : ''}`
  const label = stamp.label ?? ''
  const npmLink = `${npm}/${stamp.package}`

  switch(stamp.type) {
    case 'g':
      return {
        img: `${hostname}/badge/source-a?logo=github&color=${labelColor}`,
        link: githubLink,
        alt: 'github source',
      }
    case 'gs':
      return {
        img: `${hostname}/github/stars/${stamp.repo}?style=social`,
        link: githubLink,
        alt: 'github stars',
      }
    case 'gl':
      return {
        img: `${hostname}/github/license/${stamp.repo}?color=${color}&labelColor=${labelColor}`,
        link: githubLink,
        alt: 'github license',
      }
    case 'nv':
      return {
        img: `${hostname}/npm/v/${stamp.package}?color=${color}&labelColor=${labelColor}&label=npm`,
        link: npmLink,
        alt: 'npm version',
      }
    case 'ndt':
      return {
        img: `${hostname}/npm/dt/${stamp.package}?color=${color}&labelColor=${labelColor}&label=${label || 'downloads'}`,
        link: npmLink,
        alt: 'npm total downloads',
      }
    case 'ndd':
      return {
        img: `${hostname}/npm/dd/${stamp.package}?color=${color}&labelColor=${labelColor}&label=${label || 'downloads'}`,
        link: npmLink,
        alt: 'npm daily downloads',
      }
    case 'ndw':
      return {
        img: `${hostname}/npm/dw/${stamp.package}?color=${color}&labelColor=${labelColor}&label=${label || 'downloads'}`,
        link: npmLink,
        alt: 'npm weekly downloads',
      }
    case 'ndm':
      return {
        img: `${hostname}/npm/dm/${stamp.package}?color=${color}&labelColor=${labelColor}&label=${label || 'downloads'}`,
        link: npmLink,
        alt: 'npm monthly downloads',
      }
    case 'ndy':
      return {
        img: `${hostname}/npm/dy/${stamp.package}?color=${color}&labelColor=${labelColor}&label=${label || 'downloads'}`,
        link: npmLink,
        alt: 'npm yearly downloads',
      }
    default:
      return { img: `${hostname}/badge/unknown?color=${color}` }
  }
}
