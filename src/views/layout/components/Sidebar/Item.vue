<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []
    // if (icon) {
    //   vnodes.push(<svg-icon icon-class={icon}/>)
    // }
    if (icon) {
      const iconClass = `${icon} iconfont`
      // if (icon.indexOf('el-') === -1) {
      //   vnodes.push(<svg-icon icon-class={icon}/>)
      // } else {
      //   vnodes.push(<i class={iconClass} />)
      // }
      vnodes.push(<em class={iconClass} />)
    }
    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>
