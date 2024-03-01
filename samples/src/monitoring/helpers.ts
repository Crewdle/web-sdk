export interface ICpuData {
  usagePercentage: number;
  temperature: number;
  coreFrequencies: number[];
}

export interface IMemoryData {
  usagePercentage: number;
  total: number;
  free: number;
}

export interface IDiskData {
  usagePercentage: number;
  total: number;
  free: number;
}

export function generateData(type: string): ICpuData | IMemoryData | IDiskData {
  let data: ICpuData | IMemoryData | IDiskData;
  if (type === 'cpu') {
    const usagePercentage = Math.round(Math.random() * 100);
    const temperature = 30 + Math.round(usagePercentage * 0.4);
    const coreFrequencies = Array.from({ length: 4 }, () => 1000 + Math.random() * 2500);
    data = {
      usagePercentage: usagePercentage,
      temperature: temperature,
      coreFrequencies: coreFrequencies,
    } as ICpuData;
  } else if (type === 'memory') {
    const usagePercentage = Math.round(Math.random() * 100);
    const total = 16 * 1024;
    const free = total - (total*(usagePercentage/100));
    data = {
      usagePercentage: usagePercentage,
      total: total,
      free: free,
    } as IMemoryData
  } else if (type === 'disk') {
    const usagePercentage = Math.round(Math.random() * 100);
    const total = 512 * 1024;
    const free = total - (total*(usagePercentage/100));
    data = {
      usagePercentage: usagePercentage,
      total: total,
      free: free,
    } as IDiskData
  } else {
    throw new Error('Invalid type');
  }

  return data;
}

export function updateData(data: ICpuData | IMemoryData | IDiskData, type: string): ICpuData | IMemoryData | IDiskData {
  if (type === 'cpu') {
    const cpuData = data as ICpuData;
    const newUsagePercentage = Math.min(100, Math.max(0, cpuData.usagePercentage + (Math.random() * 20 - 10)));
    const temperatureChange = (newUsagePercentage - cpuData.usagePercentage) * 0.4;
    const newTemperature = Math.min(100, Math.max(30, cpuData.temperature + temperatureChange));
    return {
      ...cpuData,
      usagePercentage: newUsagePercentage,
      temperature: newTemperature,
      coreFrequencies: cpuData.coreFrequencies.map(frequency => Math.min(3500, Math.max(1000, frequency + (Math.random() * 200 - 100)))),
    };
  }

  if (type === 'memory') {
    const memoryData = data as IMemoryData;
    return {
      ...memoryData,
      usagePercentage: Math.min(100, Math.max(0, memoryData.usagePercentage + (Math.random() * 20 - 10))),
      total: memoryData.total,
      free: Math.max(0, memoryData.free + (Math.random() * 100 - 50)),
    };
  }

  if (type === 'disk') {
    const diskData = data as IDiskData;
    return {
      ...diskData,
      usagePercentage: Math.min(100, Math.max(0, diskData.usagePercentage + (Math.random() * 20 - 10))),
      total: diskData.total,
      free: Math.max(0, diskData.free + (Math.random() * 100 - 50)),
    };
  }

  return data;
}

export function updateInfo(data: any, type: string) {
  if (type === 'cpu' ) {
    document.getElementById('cpu-temp-value')!.textContent = data.temperature.toString().slice(0, 4);
    document.getElementById('core1-freq')!.textContent = data.coreFrequencies[0].toString().slice(0, 6);
    document.getElementById('core2-freq')!.textContent = data.coreFrequencies[1].toString().slice(0, 6);
    document.getElementById('core3-freq')!.textContent = data.coreFrequencies[2].toString().slice(0, 6);
    document.getElementById('core4-freq')!.textContent = data.coreFrequencies[3].toString().slice(0, 6);
  } else if (type === 'memory') {
    document.getElementById('mem-total-value')!.textContent = (data.total / 1024).toString().slice(0, 4);
    document.getElementById('mem-free-value')!.textContent = (data.free / 1024).toString().slice(0, 4);
  } else if (type === 'disk') {
    document.getElementById('disk-total-value')!.textContent = (data.total / 1024).toString().slice(0, 4);
    document.getElementById('disk-free-value')!.textContent = (data.free / 1024).toString().slice(0, 4);
  }
}
